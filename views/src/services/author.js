import axios from "axios";
// import axios from "axios";
export async function GetAllAuthor() {
  // debugger;
  const { data } = await axios.get("http://localhost:4000/authors");
  return data;
}
export async function GetItemById(id) {
  const { data } = await axios.get(`http://localhost:4000/authors`, {
    params: { authorNumber: id },
  });
  console.log(data);
  return data;
}

export async function Delete(id) {
  debugger;
  const token = localStorage.getItem("token");
  const {data} = await axios.delete(`http://localhost:4000/authors/${id}`);
  console.log(data);
}
export async function Add(item) {
  const { data } = await axios.post("http://localhost:4000/authors", item);
  console.log(data);
  return data;
}
export async function Edit(item, id) {
  const { data } = await axios.put(
    `http://localhost:4000/authors/${id}`,
    item
  );
  return data;
}
