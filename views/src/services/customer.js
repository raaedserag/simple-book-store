import axios from "axios";
// import axios from "axios";
export async function GetAllCstomer() {
  // debugger;
  const { data } = await axios.get("http://localhost:4000/customers");
  return data;
}
export async function GetItemById(id) {
  const { data } = await axios.get(`http://localhost:4000/customers`, {
    params: { customerNumber: id },
  });
  console.log(data);
  return data;
}

export async function Delete(id) {
  const token = localStorage.getItem("token");
  const data = await axios.delete(`http://localhost:4000/customers/${id}`);
  console.log(data);
}
export async function Add(item) {
  debugger;

  const { data } = await axios.post("http://localhost:4000/customers", item);
  console.log(data);
  return data;
}
export async function Edit(item, id) {
  const { data } = await axios.put(
    `http://localhost:4000/customers/${id}`,
    item
  );
  return data;
}
