import axios from "axios"

 
 const getReportQuantity = async()=>{
    try {
        const response = await axios.get('http://localhost:8555/api/v1/report-quantity-order')
        return response.data
    } catch (error) {
        console.error(error);
        return []
    }
 }
 const getReportVoucher = async(query:string='')=>{
    try {
        const response = await axios.get('http://localhost:8555/api/v1/report-voucher?'+query)
        return response.data
    } catch (error) {
        console.error(error);
        return []
    }
 }

export {
    getReportQuantity,
    getReportVoucher,
}