import {ResultEventModel} from './result-event.model';

export interface ResultModel {
    id: number;
    idOwner: number;
    idRecipients: number[];
    isSeen: boolean;
    eventResults: ResultEventModel[];
    contentOfResult: string;
}
