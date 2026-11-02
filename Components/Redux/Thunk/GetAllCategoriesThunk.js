import { get_categories } from "../Category/CategoryActions";
import axios from "axios";

const GetAllCategories=()=>{
    return(dispatch)=>{
        var loadedCategories=[]
        axios.get(`http://localhost:3001/Categories`)
        .then((res)=>{
            return res.data
        }).then((data)=>{
            for(let i in data){
              loadedCategories.push(data[i])
            }
            dispatch(get_categories(loadedCategories))
        })
    }
}

export default GetAllCategories;