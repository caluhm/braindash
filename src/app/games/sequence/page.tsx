
export default  function Sequence() {
  return (
    <main className="h-[calc(100vh-5rem)] bg-[#E6E8F4]">
      <div className="flex flex-col h-full">
        <div className='flex justify-center items-center w-full min-h-[540px] select-none bg-[#2B87D1]'>
        </div>
        <div className='flex flex-col justify-center items-center h-[calc(100vh-5rem-540px)] px-4'>
          <h3 className='text-4xl font-bold text-center pb-6'>Personal Best: </h3>
          <h4 className='text-2xl font-semibold text-center pb-2'>Previous Times</h4>
          <div className='max-h-[calc(100vh-5rem-700px)] overflow-y-auto py-3 px-8 bg-[#d1d3dd] rounded'>
         
          </div>
        </div>
          
      </div>
    </main>
  )
}
