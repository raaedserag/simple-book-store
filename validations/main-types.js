const Joi = require('joi');
const regExps = require("./regExps.json")
const moment = require('moment');
const { isInteger } = require('lodash');

function ExcelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}

const CustomTypes = {
    user_updates: Joi.object({
        email: Joi.string().email(),
        name: Joi.string().min(3).max(30),
        mobileNumber: Joi.string().pattern(new RegExp(regExps.egyptMobile)),
        nid: Joi.string().pattern(new RegExp(regExps.nationalId)),
        active: Joi.boolean(),
        role_id: Joi.number().min(1),
    }).required(),
    screen_updates: Joi.object({
        screen_title: Joi.string().min(3).max(30)
    }),
    function_updates: Joi.object({
        en_name: Joi.string().min(3).max(30).pattern(new RegExp(regExps.en_name)),
        ar_name: Joi.string().min(3).max(30).pattern(new RegExp(regExps.ar_name))
    }),
    role_updates: Joi.object({
        email: Joi.string().email(),
        name: Joi.string().min(3).max(30),
        mobileNumber: Joi.string().pattern(new RegExp(regExps.egyptMobile)),
        nid: Joi.string().pattern(new RegExp(regExps.nationalId)),
        active: Joi.boolean(),
        role_id: Joi.number().min(1),
    }),
    entity_updates: Joi.object({
        email: Joi.string().email(),
        name: Joi.string().min(3).max(30),
        mobileNumber: Joi.string().pattern(new RegExp(regExps.egyptMobile)),
        nid: Joi.string().pattern(new RegExp(regExps.nationalId)),
        active: Joi.boolean(),
        role_id: Joi.number().min(1),
    }),
    id: Joi.number().min(1).required(),
    user_id: Joi.number(),
    call_id: Joi.string(),
    role_id: Joi.number().min(1).required(),
    screen_id: Joi.number().min(1).required(),
    function_id: Joi.number().min(1).required(),
    entity_id: Joi.number().min(1).required(),
    ticket_category_id: Joi.number(),
    ticket_severity_id: Joi.number(),
    ticket_status_id: Joi.number(),
    parent_ticket_id: Joi.number(),
    email: Joi.string().email().required(),
    pass: Joi.string().min(8).max(30).required(),
    password: Joi.string().pattern(new RegExp(regExps.password)).required(),
    language: Joi.string().valid('ar', 'en'),
    name: Joi.string().min(3).max(30).required(),
    en_name: Joi.string().min(3).max(30).pattern(new RegExp(regExps.en_name)).required(),
    ar_name: Joi.string().min(3).max(30).pattern(new RegExp(regExps.ar_name)).required(),
    mobileNumber: Joi.string().pattern(new RegExp(regExps.egyptMobile)).required(),
    nid: Joi.string().pattern(new RegExp(regExps.nationalId)).required(),
    title: Joi.string().required(),
    screen_title: Joi.string().required(),
    description: Joi.string().required(),
    merchant_name: Joi.string().required(),
    merchant_code: Joi.string().required(),
    phone_number: Joi.string(),
    external_number: Joi.string().min(10).max(10),
    trx_ref_number: Joi.custom((value,helper)=>{
        let length = value.toString().length
        if(!isInteger(parseInt(value))) return helper.message('should be a valid reference number')
        if(!(9 <= length && length <= 15)) return helper.message('must be between 9 & 15 digits')
        return value;
    }),
    amount: Joi.number().min(0).max(9999999999),
    problem_date: Joi.date().iso(),
    bulk_ticket: Joi.object({
        ticket_category_id: Joi.string().valid(1,2,3,4).required(),
        ticket_severity_id: Joi.string().valid(1,2,3,4,5).required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.number().min(0).max(9999999999).allow('', null),
        trx_ref_number: Joi.custom((value,helper)=>{
            if (value){
                let length = value.toString().length
                if(!isInteger(parseInt(value))) return helper.message('should be a valid reference number')
                if(!(9 <= length && length <= 15)) return helper.message('transaction refrence number must be between 9 & 15 digits')
            }
            return value;
        }),
        merchant_code: Joi.number().required(),
        external_number: Joi.number().unsafe().required(),
        problem_date: Joi.custom((value,helper)=>{
            if(value.toString().includes('/')){
                if(!moment(value,"MM-DD-YYYY").isValid()){
                    return helper.message('please enter valid date')
                }else {
                    let m = moment(new Date(value)).format("YYYY-MM-DD")
                    return m        
                }
            }else{
                let m =moment(ExcelDateToJSDate(value),"YYYY-MM-DD")
                if(!m.isValid()){
                    return helper.message('please enter valid date')
                }else {
                    return m
                }
            } 
        }).required()
    }),
    ticket: Joi.object({
        new: Joi.object({
            ticket_category_id: Joi.number().min(1),
            ticket_severity_id: Joi.number().min(1),
            ticket_status_id: Joi.number().min(1),
            assigned_to: Joi.number().min(1),
            category_name: Joi.string().min(3).max(30),
            severity_name: Joi.string().min(3).max(30),
            status_name: Joi.string().min(3).max(30),
            assigned_name: Joi.string().min(3).max(30)
        }).required(),
        old: Joi.object({
            category_name: Joi.string().min(3).max(30),
            severity_name: Joi.string().min(3).max(30),
            status_name: Joi.string().min(3).max(30),
            assigned_name: Joi.string().min(3).max(30)
        }).required()
    }),
    comment: Joi.object({
        description: Joi.string().min(10).max(1500).required()
    }),
    assigned_to: Joi.number(),
    is_supervisor: Joi.boolean().required(),
    functions_ids: Joi.alternatives().try(Joi.number().min(1),
        Joi.array().items(
            Joi.number().min(1)))
}


const RefTypes = {
    id: Joi.number().min(1).required(),
    positiveShort: Joi.number().min(1).max(500),
    idNotReq: Joi.number().min(1),
    configObj: Joi.object(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(regExps.password)).required(),
    pass: Joi.string().min(0).max(100).required(),
    language: Joi.string().valid('ar', 'en').required(),
    titleString: Joi.string().min(3).max(30).required(),
    titleStringotReq: Joi.string().min(3).max(30),
    en_name: Joi.string().min(3).max(30).pattern(new RegExp(regExps.en_name)).required(),
    ar_name: Joi.string().min(3).max(30).pattern(new RegExp(regExps.ar_name)).required(),
    mobileNumber: Joi.string().pattern(new RegExp(regExps.egyptMobile)).required(),
        
    longString: Joi.string().max(1500).required(),
    longStringotReq: Joi.string().max(1500),
    flag: Joi.boolean().required(),
    optFlag: Joi.boolean().required()
}

module.exports = {
    CustomTypes,
    RefTypes
}