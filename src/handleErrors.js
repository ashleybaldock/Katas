export default function handleErrors(response) {
  console.log(response);
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response;
}

