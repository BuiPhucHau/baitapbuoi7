import { Component, OnInit } from '@angular/core';
import { Caculator } from 'src/model/calculator.model';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})



export class CounterComponent {
  firstNumberArray: string[] = [];
  secondNumberArray: string[] = [];
  caculator: Caculator = {
    firstNumber: 0,
    secondNumber: 0,
    result: 0,
    operation: ''
  }
  isToSecondNumber = false;
  isFristOperation = false;

  isNumericString(value: string): boolean {
    const numericStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    return numericStrings.includes(value);
  }
  pressKeyWord(value: string) {

    if (this.isToSecondNumber && this.isNumericString(value)) {
      this.secondNumberArray.push(value);
      this.caculator.secondNumber = parseFloat(this.secondNumberArray.join(''));
      switch (this.caculator.operation) {
        case '+': this.caculator.result = this.caculator.firstNumber + this.caculator.secondNumber; break;
        case '-': this.caculator.result = this.caculator.firstNumber - this.caculator.secondNumber; break;
        case '*': this.caculator.result = this.caculator.firstNumber * this.caculator.secondNumber; break;
        case '/': this.caculator.result = this.caculator.firstNumber / this.caculator.secondNumber; break;
      }
    }

    if (value == '+' || value == '-' || value == '*' || value == '/') {
      if (this.isFristOperation) {
        this.caculator.firstNumber = this.caculator.result;
        this.secondNumberArray = [];
      }
      this.isToSecondNumber = true;
      this.caculator.operation = value;
      this.isFristOperation = true;
    }

    if (!this.isToSecondNumber && this.isNumericString(value)) {
      this.firstNumberArray.push(value);
      this.caculator.firstNumber = parseFloat(this.firstNumberArray.join(''));
      console.log(this.firstNumberArray);
    }
    console.log(this.caculator.firstNumber, this.caculator.secondNumber,);
  }
  clearAll() {
    this.caculator = {
      firstNumber: 0,
      secondNumber: 0,
      result: 0,
      operation: ''
    }
    this.firstNumberArray = []
    this.secondNumberArray = []
    this.isToSecondNumber = false;
    this.isFristOperation = false;
  }
  delete() {

     if(!this.isToSecondNumber){
      this.firstNumberArray.pop();
      if (this.firstNumberArray.length == 0) {
        this.caculator.firstNumber = 0;
        console.log(this.caculator.secondNumber);
      } else {
        this.caculator.firstNumber = parseFloat(this.firstNumberArray.join(''));
      }
    }
    else{
      this.secondNumberArray.pop();
      if (this.secondNumberArray.length == 0) {
        this.caculator.secondNumber = 0;
        console.log(this.caculator.secondNumber);
      } else {
        this.caculator.secondNumber = parseFloat(this.secondNumberArray.join(''));
      }
      switch (this.caculator.operation) {
        case '+': this.caculator.result = this.caculator.firstNumber + this.caculator.secondNumber; break;
        case '-': this.caculator.result = this.caculator.firstNumber - this.caculator.secondNumber; break;
        case '*': this.caculator.result = this.caculator.firstNumber * this.caculator.secondNumber; break;
        case '/': this.caculator.result = this.caculator.firstNumber / this.caculator.secondNumber; break;
      }
    }
  }
  clear() {
    this.caculator.secondNumber = 0;
    this.secondNumberArray = [];
    switch (this.caculator.operation) {
      case '+': this.caculator.result = this.caculator.firstNumber + this.caculator.secondNumber; break;
      case '-': this.caculator.result = this.caculator.firstNumber - this.caculator.secondNumber; break;
      case '*': this.caculator.result = this.caculator.firstNumber * this.caculator.secondNumber; break;
      case '/': this.caculator.result = this.caculator.firstNumber / this.caculator.secondNumber; break;
    }
  }

}