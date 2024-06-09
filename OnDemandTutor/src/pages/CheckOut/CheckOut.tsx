import React from "react"

export default function CheckOut (){
    return(
        <>
            <div className="flex m-7">
                <div className="container grid grid-cols-12 gap-4 ">
                    <div className=" col-span-8 p-5 rounded-md border-2 border-gray-600">{/* left rent*/}
                        <div className="flex gap-2 justify-center">{/* select type rent*/}
                            <div className="">
                                    Select 1
                            </div>
                            <div className="">
                                    Select 2
                            </div>
                        </div>
                        <div className=""> Time</div>
                        <div>
                            <div>Your Order</div>
                            <div>X mins to rent</div>
                            <div>total :</div>
                        </div>
                    </div>
                    <div className="col-span-4 p-5 rounded-md border-2 border-gray-600 bg-slate-400">
                        con Firm pay ment xxx$
                    </div>
                </div>
            </div>
            
        </>

    )

}