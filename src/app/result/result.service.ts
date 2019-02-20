import { Injectable } from '@angular/core';
import { ResultModel } from './model/result.model';
import { ResultEventModel } from './model/result-event.model';
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/injector';
import {of} from 'rxjs/index';
import {ResultsEvenMock} from './mock/result-event.mock';
import {ResultSeenMock, ResultsMock, ResultUnseenMock} from './mock/result.mock';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }

  public addResult(newResult: ResultModel) {
    return new ResultModel();
  }

  public seenResult(idResult: number) {
      ResultSeenMock.isSeen = true;
      return ResultSeenMock;
  }

  public unseenResult(idResult: number) {
    ResultUnseenMock.isSeen = false;
    return ResultUnseenMock;
  }

  public getAllResult(): Array<ResultModel> {
    return ResultsMock;
  }

  public getAllResultSeen(): Array<ResultModel> {
    return [ResultSeenMock];
  }

  public getAllResultUnSeen(): Array<ResultModel> {
    return [ResultUnseenMock];
  }

  public numberOfEventSeen(): number
  {
    return ResultsEvenMock.length;
  }
}