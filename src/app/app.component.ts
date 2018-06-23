import { Component, OnInit } from '@angular/core';
import { Architect, Layer, Network, Trainer } from 'synaptic';
import { andSets, nandSets, norSets, notSets, orSets, xnorSets, xorSets } from './trainingSets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  network: any;
  layers: Array<any>;
  layerSizes = {
    inputs: 1,
    hidden: [2],
    outputs: 1
  };
  connections: Array<any>;
  trainOptions = {
    iterations: 10000,
    log: false,
    shuffle: true,
    cost: (target, output) => {
      let mse = 0;
      for (let i = 0; i < output.length; i++) {
        mse += Math.pow(target[i] - output[i], 2);
      }
      return mse / output.length;
    }
  };
  inputs: Array<number> = [0];
  outputs: Array<number> = [];
  trainingSet = JSON.stringify(notSets);
  isShowHowToUse = false;
  private networkArchitect: Network;
  private trainer: Trainer;

  ngOnInit(): void {
    this.networkArchitect = new Network();
    this.trainer = new Trainer(this.networkArchitect);
    this.onGenerateLayers();
  }

  nextNeuronPoint(layerIndex: number, neuronIndex: number, connectionIndex: number): number {
    const offset = (this.layers[layerIndex].length - this.layers[layerIndex + 1].length) * 30;
    return offset + (connectionIndex - neuronIndex) * 60;
  }

  connectionColor(connection) {
    const color = connection.weight > 0 ? 'green' : 'red';
    const weight = 1 + Math.abs(connection.weight);
    return {'stroke': color, 'stroke-width': weight};
  }

  connectionWeights(neuron) {
    return neuron.connections.map(c => c.weight + ' ');
  }

  onSetLogicNotSets() {
    this.trainingSet = JSON.stringify(notSets);
  }

  onSetLogicAndSets() {
    this.trainingSet = JSON.stringify(andSets);
  }

  onSetLogicOrSets() {
    this.trainingSet = JSON.stringify(orSets);
  }

  onSetLogicNandSets() {
    this.trainingSet = JSON.stringify(nandSets);
  }

  onSetLogicNorSets() {
    this.trainingSet = JSON.stringify(norSets);
  }

  onSetLogicXorSets() {
    this.trainingSet = JSON.stringify(xorSets);
  }

  onSetLogicXnorSets() {
    this.trainingSet = JSON.stringify(xnorSets);
  }

  onTrainNetwork() {
    const trainingSet = JSON.parse(this.trainingSet);
    if (trainingSet) {
      this.trainer.train(trainingSet);
      this.mapLayers();
    }
  }

  onAddNewHiddenLayer() {
    this.layerSizes.hidden.push(1);
  }

  onRemoveLayer(i) {
    this.layerSizes.hidden.splice(i, 1);
  }

  onActivate() {
    this.outputs = this.networkArchitect.activate(this.inputs);
  }

  onGenerateLayers() {
    const input = new Layer(this.layerSizes.inputs);
    const hidden = [];
    const output = new Layer(this.layerSizes.outputs);

    let previous = input;
    this.inputs = [];
    this.outputs = [];
    for (let i = 0; i < this.layerSizes.inputs; i++) {
      this.inputs.push(0);
    }

    for (let i = 0; i < this.layerSizes.hidden.length; i++) {
      const size = this.layerSizes.hidden[i];
      const layer = new Layer(size);
      hidden.push(layer);
      previous.project(layer);
      previous = layer;
    }
    previous.project(output);

    this.networkArchitect.set({
      input: input,
      hidden: hidden,
      output: output
    });
    this.mapLayers();
  }

  onToggleHowToUse() {
    this.isShowHowToUse = !this.isShowHowToUse;
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  private mapLayers() {
    this.network = this.networkArchitect.toJSON();
    this.network.neurons.forEach((neuron, index) => {
      neuron.connections = this.network.connections.filter(connection => connection.from === index);
    });

    this.layers = [];
    this.layers.push(this.network.neurons.filter(neuron => neuron.layer === 'input'));
    const hiddenNeurons = this.network.neurons.filter(neuron => Number.parseInt(neuron.layer))
      .sort((a, b) => b.layer - a.layer);
    let layersCount = 0;
    if (hiddenNeurons.length > 0) {
      layersCount = hiddenNeurons[0].layer;
    }
    for (let i = 0; i <= layersCount; i++) {
      this.layers.push(this.network.neurons.filter(neuron => neuron.layer === i));
    }
    this.layers.push(this.network.neurons.filter(neuron => neuron.layer === 'output'));
  }
}
