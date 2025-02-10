export default function aktiviteterSkeleton(){
    return(
              <li className="w-full h-full border rounded-t-[2rem] rounded-bl-[2rem] overflow-hidden bg-white shadow-md flex flex-col justify-end">
                <div className="h-24 w-full bg-gray-200 rounded-tr-[3rem] animate-pulse flex flex-col justify-center gap-3">
                  <div className="h-6 w-48 bg-gray-400 rounded animate-pulse ml-6" />
                  <div className="h-6 w-32 bg-gray-400 rounded animate-pulse ml-6" />
                </div>
              </li>
            
    )
}