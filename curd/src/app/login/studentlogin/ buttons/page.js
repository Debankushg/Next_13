"use client"

export const Button = ({body}) => {
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded" onClick={() => alert(body)}>Click Me</button>
    </>
  )
};