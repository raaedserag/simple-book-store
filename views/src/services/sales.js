import axios from "axios";
// import axios from "axios";
export async function GetAll() {
  // debugger;
  const { data } = await axios.get("http://localhost:4000/sales/");
  return data;
}
export async function GetItemById(id) {
  const { data } = await axios.get(`http://localhost:4000/sales`, {
    params: { id: id },
  });
  console.log(data);
  return data;
}

export async function Delete(id) {
  const token = localStorage.getItem("token");
  const data =await axios.delete(`http://localhost:4000/sales/${id}`);
  console.log(data);
}
export async function Add(item) {
  debugger;

  const { data } = await axios.post("http://localhost:4000/sales", item);
  console.log(data);
  return data;
}
export async function Edit(item, id) {
  const { data } = await axios.put(
    `http://localhost:4000/sales/${id}`,
    item
  );
  return data;
}
