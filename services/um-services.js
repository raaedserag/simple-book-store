// Classes & Modules
const {CrudServices} = require("../classes/Services-Classes")
const { sendMail } = require("./mailer-service")
const models = require("../models/index");
const formatter = require("../helpers/formatting-helper");
// Constants
const mailLangMap = {
  "ar": require("../languages/ar.json").userCredentialsMail,
  "en": require("../languages/en.json").userCredentialsMail
}

const dbName = require("../config/config.json")[process.env.NODE_ENV]['database']
const modelNames = require("../models/table-names.json")
//------------------------------------
class UserServices extends CrudServices{
  constructor() {
    super(models["User"])
  }

  async findUserWithPass(email){
    let result = await this.customSelect(`
      SELECT id, password
      FROM ${dbName}.${modelNames.Users}
      WHERE email = $email
    `, {"email": email})
    return result;
  }
  async getUserInfo(userId) {
    let result = await this.customSelect(`
    SELECT u.id, u.name , u.role_id, r.language AS 'language'
    FROM ${dbName}.${modelNames.Users} u
    LEFT JOIN ${dbName}.${modelNames.Um_Roles} r
    ON u.role_id = r.id
    WHERE u.id = $userId;
    `, { "userId": userId })
    
    return result;
  }

  // Send User credentials mail
  async sendRegisterCredentials(userMail, userPass, options = {}) {
    if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "dev-prod") return console.log(`Password: ${userPass}`)
    let is_new = options.is_new || true,
      lang = options.lang || 'ar'
    // Formatting mail template
    let mailTemplate = 
    `
    ${mailLangMap[lang]['line1'][is_new ? 'new' : 'old']}
    ${mailLangMap[lang]['line2']}\n\t\t${userMail}
    ${mailLangMap[lang]['line3']}\n\t\t${userPass}
    `
    await sendMail(
      mailTemplate,
      userMail,
      `Damen Call Center Credentials`
    )
  }
}

class EntityServices extends CrudServices{
  constructor() {
    super(models["Um_Entity"])
  }
}

class RolesConfigServices extends CrudServices{
  constructor() {
    super(models["UM_Role_Configuration"])
  }
}
class RoleServices extends CrudServices{
  constructor() {
    super(models["Um_Role"])
  }
  async insert(item) {
    if(!item.config_id){
      item.config_id = require("../rules/defaults.json").default_configId;
    }
    let newItem = await this.model.create(item);
    if(newItem){
      newItem['createdAt'] = `${new Date(new Date(newItem.createdAt) + "UTC")}`
      newItem['updatedAt'] = `${new Date(new Date(newItem.updatedAt) + "UTC")}`
    }
    return newItem? newItem : null
  }

  async getRoleInfo(roleId, lang = 'en') {
    let result = await this.customSelect(`
    SELECT r.${lang}_name AS 'role_name', e.${lang}_name AS 'entity_name', e.id AS 'entity_id', c.configuration AS 'config'
    FROM ${dbName}.${modelNames.Um_Roles} r
    LEFT JOIN ${dbName}.${modelNames.Um_Entities} e
    ON r.entity_id = e.id
    LEFT JOIN ${dbName}.${modelNames.UM_Role_Configuration} c
    ON r.config_id = c.id
    WHERE r.id = $roleId
    `, { "roleId": roleId })
    
    return result;
  }

  async getAssociatedFns(roleId, lang = 'en') {
    let result = await this.customSelect(`
    SELECT f.id, f.${lang}_name AS 'name'
    FROM ${dbName}.${modelNames.Um_Role_Does_Function} rdf
    RIGHT JOIN ${dbName}.${modelNames.Um_Roles} r
    ON r.id = rdf.role_id
    LEFT JOIN ${dbName}.${modelNames.Um_Functions} f 
    ON f.id = rdf.function_id
    WHERE r.id = $roleId
    `, { "roleId": roleId })

    return !result ? null
      : (!result.length)
        ? [result]
        : result
  }
  
  async getAccessedScreens(roleId, lang = 'en', categorized = false) {
    let fSI = new FunctionServices()
    // Get Assigned Functions
    let functions = await this.getAssociatedFns(roleId, lang)
    if (!functions) return {functions: null, screens: null}
  
    // Get Accessed Screens
    let screens, allScreens = null;
    for (let index = 0; index < functions.length; index++) {
      screens = await fSI.getAssociatedScreens(functions[index]['id'])
      if(screens) functions[index].screens = screens
    }
    
    // Format screens & functions
    if (!categorized) {
      allScreens = []
      functions = functions.map(fn => {
        if (fn.screens) allScreens = allScreens.concat(fn.screens)
        return fn.name
      })
      return {functions, screens: allScreens}
    }
    else {
      return {functions}
    }
  }

  // Get All roles
  async getAllRoles() {
    let result = await this.find();

    result = JSON.parse(JSON.stringify(result, null, 2))
    if (!result) return null

    result = formatter.roles_Format(result)
    return result? result: null
  }
}

class R_do_f_Services extends CrudServices{
  constructor() {
    super(models["Um_Role_Does_Function"])
  }

  async getAssignedFunctions(filters = {function: null, role: null, entity: null}, language='en') {
    let result = await this.find({}, [
      {
        model: models["Um_Function"], required: true, where: filters.function
      },
      {
        model: models["Um_Role"], required: true, where: filters.role, include: [{
          model: models["Um_Entity"], required: true, where: filters.entity
      }]}
    ])
    result = JSON.parse(JSON.stringify(result, null, 2))
    if (!result) return null

    result = formatter.r_do_function_Format(result, language)
    return result? result: null
  }
}

class FunctionServices extends CrudServices{
  constructor() {
    super(models["Um_Function"])
  }
  async getAssociatedScreens(funcId) {
    let result = await this.customSelect(`
      SELECT s.screen_title AS 'title'
      FROM ${dbName}.${modelNames.Um_Function_Manages_Screen} fms
      RIGHT JOIN ${dbName}.${modelNames.Um_Functions} f 
      ON f.id = fms.function_id
      LEFT JOIN ${dbName}.${modelNames.Um_Screens} s
      ON fms.screen_id = s.id 
      WHERE f.id = $funcId
      `, { "funcId": funcId })
    
    return !result ? null
      : (!result.length)
        ? [result['title']]
        : result.map(s=> s['title'])
  }

}
class ScreenServices extends CrudServices{
  constructor() {
    super(models["Um_Screen"])
  }
}

class F_manage_s_Services extends CrudServices{
  constructor() {
    super(models["Um_Function_Manages_Screen"])
  }

  async getManagedScreens(filters = { function: null, screen: null }, language = 'en') {
    let result = await this.find({}, [
      {model: models["Um_Function"], required: true, where: filters.function},
      {model: models["Um_Screen"], required: true, where: filters.screen}
    ])
    result = JSON.parse(JSON.stringify(result, null, 2))
    if (!result) return null
    
    result = formatter.f_manage_screen_Format(result, language)
    return result? result: null
  }
  
}

class R_AssignTo_R_Services extends CrudServices{
  constructor() {
    super(models["Um_Roles_AssignTo_Roles"])
  }
  async getAssignableRoles(roleId = null, language = 'ar') {
  
    let queryState = `
    SELECT R1.id AS 'id', R1.en_name AS 'r_en', R1.ar_name AS 'r_ar',
    R2.id AS 'role_id', R2.en_name, R2.ar_name
    FROM ${dbName}.${modelNames.Um_Role_AssignTo_Role} A
    RIGHT JOIN ${dbName}.${modelNames.Um_Roles} R1
    ON R1.id = A.role_id
    INNER JOIN ${dbName}.${modelNames.Um_Roles} R2
    ON A.assign_to_id = R2.id
    `  
    queryState = roleId? queryState + `WHERE R1.id = $roleId`: queryState
    let result = await this.customSelect(queryState, { roleId: roleId })
    
    result = JSON.parse(JSON.stringify(result, null, 2))
    if (!result) return null
    
    result = formatter.r_assign_r_Format(result, language)
    return result? result: null
  }
}

class R_AcessTo_R_Services extends CrudServices{
  constructor() {
    super(models["Um_Roles_AccessTo_Roles"])
  }
  async getAccessableRoles(roleId = null) {
  
    let queryState = `
    SELECT R1.id AS 'id', R1.en_name AS 'r_en', R1.ar_name AS 'r_ar',
    R2.id AS 'role_id', R2.en_name, R2.ar_name
    FROM ${dbName}.${modelNames.Um_Role_AccessTo_Roles} A
    RIGHT JOIN ${dbName}.${modelNames.Um_Roles} R1
    ON R1.id = A.role_id
    INNER JOIN ${dbName}.${modelNames.Um_Roles} R2
    ON A.access_to_id = R2.id
    `  
    queryState = roleId? queryState + `WHERE R1.id = $roleId`: queryState
    let result = await this.customSelect(queryState, { roleId: roleId })
    
    result = JSON.parse(JSON.stringify(result, null, 2))
    if (!result) return roleId
    
    result = formatter.r_access_r_Format(result)
    result? result.push(roleId) : result = roleId
    return result
  }
}

module.exports = {
  uSI: new UserServices(),
  eSI: new EntityServices(),
  rSI: new RoleServices(),
  rcSI: new RolesConfigServices(),
  r_do_fSI: new R_do_f_Services(),
  fSI: new FunctionServices(),
  sSI: new ScreenServices(),
  f_manage_sSI: new F_manage_s_Services(),
  r_assign_rSI: new R_AssignTo_R_Services(),
  r_access_rSI: new R_AcessTo_R_Services(),
  UserServices,
  EntityServices,
  RolesConfigServices,
  RoleServices,
  R_do_f_Services,
  FunctionServices,
  ScreenServices,
  F_manage_s_Services,
  R_AssignTo_R_Services,
  R_AcessTo_R_Services
}