import api from "../services/api"
import { UpdatedReport } from "store/modules/report/types";

export const deleteReportAPI = async (id: string) => {
    try {
        const response = await api.deletereporting(id);
        
        return response
    } catch (err) {
        console.log('delete report api error', err)
    }
}

export const updatedReportAPI =async (updatedReport:UpdatedReport) => {
    try {
        const response = await api.updatereporting(updatedReport);
        return response
    } catch (error) {
        console.log('update report api error', error)
    }
}