import axios from "axios";
// import axios from "axios";
export async function GetAll() {
  // debugger;
  const { data } = await axios.get("http://10.43.30.95:4000/wrotes");
  return data;
}
export async function GetItemById(id) {
  const { data } = await axios.get(`http://10.43.30.95:4000/wrotes`, {
    params: { id: id },
  });
  console.log(data);
  return data;
}

export async function Delete(id) {
  const token = localStorage.getItem("token");
  const data =await axios.delete(`http://10.43.30.95:4000/wrotes/${id}`);
  console.log(data);
}
export async function Add(item) {
  debugger;

  const { data } = await axios.post("http://10.43.30.95:4000/wrotes", item);
  console.log(data);
  return data;
}
export async function Edit(item, id) {
  const { data } = await axios.put(
    `http://10.43.30.95:4000/wrotes/${id}`,
    item
  );
  return data;
}
