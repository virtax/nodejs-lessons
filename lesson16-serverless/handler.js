export const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, AWS Lambda!" }),
  };
};

export const goodbye = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Goodbye, AWS Lambda!" }),
  };
};