import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/Interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-side-bar-esquerdo',
  templateUrl: './side-bar-esquerdo.component.html',
  styleUrls: ['./side-bar-esquerdo.component.scss']
})
export class SideBarEsquerdoComponent implements OnInit {

  menuSelecionado = 'Home';
  playlists: IPlaylist[] = [];

  //Icones
  homeIcone = faHome
  pesquisarIcone = faSearch
  artistaIcone = faGuitar
  playlistIcone = faMusic 

  constructor(
    private router: Router,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarPlaylists()
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao
    this.router.navigateByUrl('player/home')
  }

  irParaPlaylist(playlistId: string){
    this.menuSelecionado = playlistId
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }

  async buscarPlaylists(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario()
  }

}
