import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { sub } from 'date-fns';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factorys';
import { IMusica } from 'src/app/Interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  
  playing = false

  musica: IMusica = newMusica();
  subs: Subscription[] = []

  //Icones
  anteriorIcone = faStepBackward
  proximoIcone = faStepForward
  playIcone = faPlay
  pauseIcone = faPause

  constructor(private playerService: PlayerService) { }


  ngOnInit(): void {
    this.obterMusicaTocando()
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe())
  }


  obterMusicaTocando(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica
    })

    this.subs.push(sub)
  }

  voltarMusica(){
     this.playerService.voltarMusica()
  }
  proximaMusica(){
    this.playerService.proximaMusica()
  }
  pausarMusica(){
    this.playing = false
    this.playerService.pausarMusica()
  }
  playMusica(){
    this.playing = true
    this.playerService.playMusica()
  }


}
