export default function Error({
  statusCode,
  error,
}: {
  statusCode?: number;
  error?: any;
}) {
  if (typeof statusCode == "number") {
    return (
      <div>
        <h1>Error with status code {statusCode}</h1>
        <p>{error}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Sorry! The requested page is not found.</h1>
        <p>{error}</p>
      </div>
    );
  }
}
