import { Describe } from "../../Test/Describe";
import { invalidArguments } from "./invalidArguments";
import { offsetCalulation } from "./offsetCalculation";

const describes =
[
    offsetCalulation,
    invalidArguments,
]

export const paginationTests = new Describe('Pagination tests', describes)