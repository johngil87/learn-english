import { Component, OnInit } from '@angular/core';
import { VerbDataService, Verb } from 'src/app/core/verb-data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent  implements OnInit{
  allVerbs: Verb[] = [];
  verb!: Verb;

  constructor(private verbService: VerbDataService) {}

  ngOnInit(): void {
    this.verbService.getVerbs().subscribe(verbs => {
      this.allVerbs = verbs;
      this.pickRandomVerb();
    });
  }
  userResponses = {
    present: '',
    past: '',
    participle: ''
  };

  feedback = {
    present: '',
    past: '',
    participle: ''
  };
  showSound: boolean = false;
  selectedSound: '' | 'd' | 't' | 'id' = '';
  soundFeedback: string = '';

  pickRandomVerb(): void {
    const index = Math.floor(Math.random() * this.allVerbs.length);
    this.verb = this.allVerbs[index];
    this.resetForm();
  }

  resetForm(): void {
    this.userResponses = { present: '', past: '', participle: '' };
    this.feedback = { present: '', past: '', participle: '' };
    this.selectedSound = '';
    this.soundFeedback = '';
    this.showSound = false;
  }

  handleInput(form: 'present' | 'past' | 'participle', value: string) {
    this.userResponses[form] = value;
  }

  checkAnswers() {
    this.showSound = true;
    if (this.verb.type === 'irregular') {
      for (let form of ['present', 'past', 'participle'] as const) {
        const correct = this.verb[form].toLowerCase().trim();
        const user = this.userResponses[form].toLowerCase().trim();
        this.feedback[form] = user === correct ? '✔️ Correcto' : '❌ Respuesta correcta: '+correct;
      }
    }
    if (this.verb.type === 'regular') {
      for (let form of ['present', 'past'] as const) {
        const correct = this.verb[form].toLowerCase().trim();
        const user = this.userResponses[form].toLowerCase().trim();
        this.feedback[form] = user === correct ? '✔️ Correcto' : '❌ Respuesta correcta: '+correct;
      }
       if (this.selectedSound === this.verb.finish) {
        this.soundFeedback = '✔️ Sonido correcto';
      } else {
        this.soundFeedback = '❌ el sonido correcto es: '+this.verb.finish;
      }
    }
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  }

}
