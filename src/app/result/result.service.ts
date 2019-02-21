import { Injectable } from '@angular/core';
import { ResultModel } from './model/result.model';
import { ResultEventModel } from './model/result-event.model';
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/injector';
import {of} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }
  results: Array<ResultModel> = [];

  public addResult(newResult: ResultModel) {
    this.results.push(newResult);
    return this.results;
  }

  public seenResult(idResult: number) {
    const resIndex = this.results.findIndex(result => result.id === idResult);
    this.results[resIndex].isSeen = true;
    return this.results;
  }

  public unseenResult(idResult: number) {
      const resIndex = this.results.findIndex(result => result.id === idResult);
      this.results[resIndex].isSeen = false;
      return this.results;
  }

  public getAllResult(): Array<ResultModel> {
    return this.results;
  }

  public getAllResultSeen(): Array<ResultModel> {
    return this.results.filter( result => result.isSeen === true);
  }

  public getAllResultUnSeen(): Array<ResultModel> {
      return this.results.filter( result => result.isSeen === false);
  }

  public numberOfEventSeen(): number
  {
      return this.results.filter( result => result.isSeen === true).length;
  }
}