import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  insults: string[];
  notLusers: string[];
  insult: string;
  priorInsult: string;
  subscription: Subscription;
  luser: string;
  timerLength: number = 1000;
  user = this.fb.group({ user: ['', Validators.required] });

  constructor(private title: Title, private fb: FormBuilder) {
    this.insults = this.buildInsults();
    this.notLusers = this.awesomePeople();
  }
  ngOnInit() {
    this.redirector();
    this.getInsult();
    this.luser = this.lusername();
    this.title.setTitle(this.luser + ' | You Are Lame');
    const source = interval(this.timerLength);
    this.subscription = source.subscribe(() => {
      this.priorInsult = this.insult;
      this.getInsult();
    });
  }

  newLuser() {
    this.luser = this.user.get('user').value;
    localStorage.setItem('luser', this.luser);
  }

  private redirector() {
    if (window.location.hostname !== 'localhos') {
      localStorage.setItem('luser', this.lusername());
    } else if (localStorage.getItem('luser') !== null) {
      this.luser = localStorage.getItem('luser');
    }
    console.log('Localstorage: ' + localStorage.getItem('luser'));
  }

  private lusername(): string {
    let host = window.location.hostname;
    host = 'chris.simiskey';
    let luser = host.replace('localhost', '').replace('.', ' ');
    if (this.notLusers.indexOf(luser) > -1) {
      luser = 'They are not lame';
    }
    luser = luser
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return luser;
  }

  private getInsult() {
    while (this.insult === this.priorInsult) {
      this.insult = this.insults[Math.floor(Math.random() * this.insults.length)];
    }
  }

  private buildInsults() {
    return [
      'Seagulls target you',
      'You think Instagram is for Nana',
      'Your pet rock left you',
      'Life passed you by',
      'Everyone thinks you suck',
      'You are a jackass',
      'You think this site is about you',
      'You let Joe Biden hug you',
      'You are lame',
      'Nobody likes you',
      'Find My Friends blocked you',
      'Your Chia Pet died'
    ];
  }

  /**
   * Not really
   *
   * Not my choice that this exists, but court orders
   * prevent me from calling these people lame
   */
  private awesomePeople() {
    const notLusers = ['halden zimmerman', 'leica asshole hal zimmerman', 'chris simiskey'];
    return notLusers;
  }
}
