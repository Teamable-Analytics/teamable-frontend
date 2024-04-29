const Custom404 = ({ message }: { message: string }) => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <h2>{message}</h2>
    </>
  )
}

export default Custom404
