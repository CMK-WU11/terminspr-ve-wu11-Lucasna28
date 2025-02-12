export default function KalenderSkeleton(){
    return(
             
              <li className="w-full h-24 border rounded-lg overflow-hidden p-4 bg-white shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
              
                  </div>
                </div>
              </li>
            
    )
}