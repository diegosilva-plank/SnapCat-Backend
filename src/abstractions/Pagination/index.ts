export interface IPagination
{
    readonly page: number
    readonly itensPerPage: number
}

export class Pagination 
{
    readonly page: number
    readonly itensPerPage: number

    constructor({page, itensPerPage}: IPagination) {
        if (page <= 0 || !Number.isInteger(page) || itensPerPage <= 0 || !Number.isInteger(itensPerPage))
            throw new Error(`Invalid values for pagination. page: ${page}, itensPerPage: ${itensPerPage}`)
        this.page = page
        this.itensPerPage = itensPerPage
    }

    public getOffset = () => this.itensPerPage * (this.page - 1)
}