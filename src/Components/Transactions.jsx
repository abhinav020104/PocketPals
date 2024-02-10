import constructionImage from "../assets/Images/UnderConstruction.jpg"
function Transactions (){
    return(
        <div className="w-full h-full flex justify-center items-center">
            <img src = {constructionImage} className="rounded-md drop-shadow-2xl "/>
        </div>
    )
}
export default Transactions;