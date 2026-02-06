import type { DefaultCellProps } from "../tableInterfaces";

export const DefaultCellComponent = ({ data }: DefaultCellProps) => {

    return <span className="data">{data ?? '-'}</span>
}