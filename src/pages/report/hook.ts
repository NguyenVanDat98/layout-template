import { getReportQuantity, getReportVoucher } from "./api"
import { TRANSLATE_TYPE_PIKER } from "./screens"

const getReportQuantityByDay =async(e={})=>{
    try {
        return await getReportQuantity(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.date}).toString())
    } catch (error) {
        console.error('getReportQuantityByDay',)
        return []
    }
}
const getReportQuantityByMonth =async(e={})=>{
    try {
        return await getReportQuantity(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.month}).toString())
    } catch (error) {
        console.error('getReportQuantityByMonth',)
        return []
    }
}
const getReportQuantityByQuarter =async(e={})=>{
    try {
        return await getReportQuantity(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.quarter}).toString())
    } catch (error) {
        console.error('getReportQuantityByQuarter',)
        return []
    }
}
const getReportQuantityByYear =async(e={})=>{
    try {
        return await getReportQuantity(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.year}).toString())
    } catch (error) {
        console.error('getReportQuantityByYear',)
        return []
    }
}
const getReportQuantityByWeek =async(e={})=>{
    try {
        return await getReportQuantity(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.week}).toString())
    } catch (error) {
        console.error('getReportQuantityByWeek',)
        return []
    }
}
export {
    getReportQuantityByDay,
    getReportQuantityByMonth,
    getReportQuantityByQuarter,
    getReportQuantityByYear,
    getReportQuantityByWeek,
}



const getReportVoucherByWeek =async(e={})=>{
    try {
        return await getReportVoucher(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.week}).toString())
    } catch (error) {
        console.error('getReportVoucherByWeek',)
        return []
    }
}
const getReportVoucherByDay =async(e={})=>{
    try {
        return await getReportVoucher(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.date}).toString())
    } catch (error) {
        console.error('getReportVoucherByDay',)
        return []
    }
}
const getReportVoucherByMonth =async(e={})=>{
    try {
        return await getReportVoucher(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.month}).toString())
    } catch (error) {
        console.error('getReportVoucherByMonth',)
        return []
    }
}
const getReportVoucherByQuarter =async(e={})=>{
    try {
        return await getReportVoucher(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.quarter}).toString())
    } catch (error) {
        console.error('getReportVoucherByQuarter',)
        return []
    }
}
const getReportVoucherByYear =async(e={})=>{
    try {
        return await getReportVoucher(new URLSearchParams({...e,typeDateReport:TRANSLATE_TYPE_PIKER.year}).toString())
    } catch (error) {
        console.error('getReportVoucherByYear',)
        return []
    }
}


export {
    getReportVoucherByWeek,
    getReportVoucherByDay,
    getReportVoucherByMonth,
    getReportVoucherByQuarter,
    getReportVoucherByYear,
}