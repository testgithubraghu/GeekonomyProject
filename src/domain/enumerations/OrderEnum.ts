export enum  orderTypeEnum{
    ASCENDING = "ASC",
    DESCENDING = "DSC",
}
export class OrderTypeEnumUtils {

    public static orderTypeEnumText(type: any) {
        switch (type) {
            case orderTypeEnum.ASCENDING: return 'ascendingOrder';
            case orderTypeEnum.DESCENDING: return 'descendingOrder';
        }
    }
}