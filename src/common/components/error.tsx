export default function Error({ statusCode }: { statusCode?: number }) {
  if (typeof statusCode == "number") {
    return <h1>Error with status code {statusCode}</h1>;
  } else {
    return <h1>Sorry! The requested page is not found.</h1>;
  }
}
