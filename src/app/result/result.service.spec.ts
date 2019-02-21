import {TestBed, fakeAsync} from '@angular/core/testing';
import {ResultService} from './result.service';
import {ResultModel} from './model/result.model';
import {HttpClientModule} from '@angular/common/http';

describe('ResultService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [ResultService]
    }));

    let resultService: ResultService;

    it('should be created', () => {
        resultService = TestBed.get(ResultService);
        expect(resultService).toBeTruthy();
    });


    /* step 1 : initialisation du projet avec 0 et 1 resultat */
    it('devrait être initialisé avec une liste de résultat vide',
        fakeAsync(() => {
            expect(resultService.getAllResult()).toEqual([]);
        })
    );

    describe('aprés l\'ajout d\'un résultat,', () => {
        beforeEach(() => {
            const result: ResultModel = {
                id: 46,
                idOwner: 76,
                idRecipients: [42],
                isSeen: false,
                eventResults: [],
                contentOfResult: 'Test'
            };
            resultService = new ResultService();
            resultService.addResult(result);
        });

        it('devrait avoir une liste de 1 résultat non vue',
            fakeAsync(() => {
                expect(resultService.getAllResult().length).toEqual(1);
            })
        );

        it('devrait avoir une liste de 1 résultat vue aprés la vision de ce résultat',
            fakeAsync(() => {
                resultService.seenResult(46);
                expect(resultService.getAllResultSeen().length).toEqual(1);
                const result: ResultModel = {
                    id: 47,
                    idOwner: 76,
                    idRecipients: [42],
                    isSeen: true,
                    eventResults: [],
                    contentOfResult: 'Test'
                };
                resultService.addResult(result);
                expect(resultService.getAllResult()[1].isSeen).toEqual(true);
            })
        );
    });

    /* step 2 : 3 resultats */
    describe('aprés l\'ajout de 3 resultats,', () => {

      beforeEach(() => {
          // init le service avec 3 resultats
          resultService.results = [
            {
                id: 46,
                idOwner: 76,
                idRecipients: [42],
                isSeen: false,
                eventResults: [],
                contentOfResult: 'Test'
            },
            {
                id: 47,
                idOwner: 76,
                idRecipients: [42],
                isSeen: false,
                eventResults: [],
                contentOfResult: 'Test'
            },
            {
                id: 48,
                idOwner: 76,
                idRecipients: [42],
                isSeen: false,
                eventResults: [],
                contentOfResult: 'Test'
            },
        ];
      });

      it('devrait avoir une liste de 3 resultats non vue aprés l\'ajout de 3 resultat.',
        fakeAsync(() => {
            expect(resultService.getAllResultUnSeen().length).toEqual(3);
        })
      );

      it('ne devrait pas authorisé l\'ajout d\'un résultats avec un id existent',
        fakeAsync(() => {
            const result: ResultModel = {
                id: 47,
                idOwner: 76,
                idRecipients: [42],
                isSeen: true,
                eventResults: [],
                contentOfResult: 'Test'
            };
            expect(resultService.addResult(result)).toEqual(false);
        })
      );

      it('devrait avoir 1 resultats vue dans la liste aprés la vision d\'un resultat',
        fakeAsync(() => {
          resultService.seenResult(47);
            expect(resultService.getAllResultSeen().length).toEqual(1);
        })
      );

      it('devrait avoir les 3 resultats vue dans la liste aprés qu\'il soit tous vue',
        fakeAsync(() => {
            resultService.results.map(result => resultService.seenResult(result.id));
            expect(resultService.getAllResultSeen().length).toEqual(3);
        })
      );

      it('devrait avoir plus que 2 resultats vue dans la liste aprés qu\'il soit tous vue puis 1 ou la vue est enlevé',
        fakeAsync(() => {
            resultService.results.map(result => resultService.seenResult(result.id));
            expect(resultService.getAllResultSeen().length).toBeGreaterThan(2);
            resultService.unseenResult(47);
            expect(resultService.getAllResultUnSeen().length).toEqual(1);
        })
      );

      it('ne devrait pas planté aprés la vision d\'un resultat non ajouté',
        fakeAsync(() => {
          expect(resultService.seenResult(88)).toEqual(false);
        })
      );
    });

    //
    // /* step 3 (evenement) */
    // describe(',aprés l\'ajout de 3 resultats,', () => {
    //
    //   beforeEach(() => {
    //     // init le service avec 3 resultats (doit etre identique que le step 2)
    //   });
    //
    //   //ps : je ne veux pas que les event de création soi initialisé dans le beforeEach ci dessus mais directement dans le resultService
    //   it('devrait avoir la list des résultat dans l\'order de création ( en se basant sur les events de création)',
    //     fakeAsync(() => {
    //       expect(false).toEqual(true);
    //     })
    //   );
    //
    //   it('devrait avoir 1 event a la date de maintenant quand 1 résultat est vue',
    //     fakeAsync(() => {
    //       expect(false).toEqual(true);
    //     })
    //   );
    //
    //   it('devrait avoir 2 events avec 2 dates différent aprés la vision d\'un resultat puis la suppression de la vision',
    //     fakeAsync(() => {
    //       expect(false).toEqual(true);
    //     })
    //   );
    //
    //   it('devrait avoir une fonction qui retourne une liste ordonnée des resultats par rapport au dernier modifier',
    //     fakeAsync(() => {
    //       expect(false).toEqual(true);
    //     })
    //   );
    //
    // });
    //
    //
    // /* proposé de nouveau test */

});
