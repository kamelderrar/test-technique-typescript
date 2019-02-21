import {Injectable} from '@angular/core';
import {ResultModel} from './model/result.model';
import {ResultEventModel} from './model/result-event.model';

@Injectable({
    providedIn: 'root'
})
export class ResultService {

    constructor() {
    }

    results: Array<ResultModel> = [];

    /**
     * Ajout de plusieurs résultats
     * @param {Array<ResultModel>} newResults
     */
    public addMultipleResults(newResults: Array<ResultModel>) {
        newResults.map(
            newResult => {
                this.addResult(newResult);
            }
        );
    }

    /**
     * Ajout d'un résultat
     * @param {ResultModel} newResult
     * @returns {any}
     */
    public addResult(newResult: ResultModel) {

        if (this.results.some(result => result.id === newResult.id)) {
            return null;
        }
        const newEvent: ResultEventModel = {
            id: 'created',
            idOwner: 46,
            createdAt: new Date()
        };
        newResult.eventResults.push(newEvent);
        this.results.push(newResult);
        return this.results;
    }

    /**
     * Vision du résultat
     * @param {number} idResult
     * @returns {any}
     */
    public seenResult(idResult: number) {
        const resIndex = this.results.findIndex(result => result.id === idResult);
        if (resIndex === -1) {
            return null;
        }
        const newEvent: ResultEventModel = {
            id: 'seen',
            idOwner: 46,
            createdAt: new Date()
        };
        this.results[resIndex].eventResults.push(newEvent);
        this.results[resIndex].isSeen = true;
        return this.results[resIndex];
    }

    /**
     * Rend un résultat non visible
     * @param {number} idResult
     * @returns {any}
     */
    public unseenResult(idResult: number) {
        const resIndex = this.results.findIndex(result => result.id === idResult);
        if (resIndex === -1) {
            return null;
        }
        const newEvent: ResultEventModel = {
            id: 'received',
            idOwner: 46,
            createdAt: new Date()
        };
        this.results[resIndex].eventResults.push(newEvent);
        this.results[resIndex].isSeen = false;
        return this.results[resIndex];
    }

    /**
     * Retourne tous les resultat
     * @returns {Array<ResultModel>}
     */
    public getAllResult(): Array<ResultModel> {
        return this.results;
    }

    /**
     * Retourne les resultat visible
     * @returns {Array<ResultModel>}
     */
    public getAllResultSeen(): Array<ResultModel> {
        return this.results.filter(result => result.isSeen === true);
    }

    /**
     * Retourne les resultat non visible
     * @returns {Array<ResultModel>}
     */
    public getAllResultUnSeen(): Array<ResultModel> {
        return this.results.filter(result => result.isSeen === false);
    }

    /**
     * Retourne le nombre d'évent vus
     * @returns {number}
     */
    public numberOfEventSeen(): number {
        return this.getAllResultSeen().length;
    }

    /**
     * Retourne une liste ordonnée des resultats par rapport au dernier modifier
     * @returns {Array<ResultModel>}
     */
    public sortResultByDate() {
        return this.results.sort((a, b) => {
            return a.eventResults[a.eventResults.length - 1].createdAt.getTime()
                - b.eventResults[b.eventResults.length - 1].createdAt.getTime();
        });
    }
}
