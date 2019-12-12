export declare enum DataType {
    Boolean = 1,
    Currency = 2,
    DateTime = 7,
    LongText = 6,
    Numeric = 3,
    Percentage = 4,
    ShortText = 5,
    Unknown = 0
}

export declare enum AggregateMethod {
    Any = 8,
    Avg = 4,
    Count = 5,
    CountDistinct = 6,
    Max = 2,
    Median = 7,
    Min = 1,
    Sum = 3,
    Ungrouped = 0
}

export declare enum SortDirection {
    Ascending = 0,
    Descending = 1
}

export declare enum FormatOptionType {
    BooleanDisplay = 3,
    DateDisplay = 4,
    NumberOfDecimalPlaces = 1,
    NumericDisplay = 2,
    TextAlign = 5,
    TimeDisplay = 6,
    WordWrap = 7
}


export interface ReportColumnTotalDto {
    name?: string;
    aggregateMethod: AggregateMethod;
    isDistinct: boolean;
    isActive: boolean;
}

export interface ReportFormatOptionDto {
    type: FormatOptionType;
    value?: string;
}


export interface ReportColumnDto {
    id?: string;
    navPath?: string;
    name?: string;
    isHidden: boolean;
    width?: number;
    sortDirection?: SortDirection;
    ordinal?: number;
    groupOrder?: number;
    groupTotal?: ReportColumnTotalDto;
    reportTotal?: ReportColumnTotalDto;
    formatOptions?: ReportFormatOptionDto[];
}

export interface Column extends ReportColumnDto {
  id?: string;
  canAutoResize?: boolean;
  toggleable?: boolean;
  prop?: string;
  sortBy?: boolean;
  groupBy?: boolean;
  dataType?: DataType;
  animate?: boolean;
  navPath?: string;
  fieldPath?: string;
  align?: string;
  textWrap?: boolean;
}