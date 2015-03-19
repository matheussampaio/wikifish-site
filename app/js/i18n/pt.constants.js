(function () {
    'use strict';

    angular
        .module('wfApp.i18n')
        .constant('i18n', {
            // Alimentação:
            'DRY_PACKAGE_FOOD': '', // MISSING
            'LIVE_WORMS': 'Alimentos vivos como, besouro de amendoim, Live worms, Daphnia, etc.',
            'PLANTS': 'Vegetariano.',
            'FISH': 'Peixe vivos.',

            // Temperamento:
            'PEACEFUL': 'Pacífico.',
            'DANGER': 'Não Recomendado para iniciantes.',

            // Aquário:
            'COMPLETED_SET': 'Completo, plantas, rochas, troncos, etc.',
            'ONLY_PLANTS': 'Densamente plantado.',
            'ONLY_ROCKS': 'Apenas rochas, sem plantas.',
            'ONLY_SUBSTRACT': 'Apenas substrato no fundo do aquário.',

            // Reprodução:
            'EGGYLAYER': 'Ovíparo.',
            'LIVEBEARER': 'Vivíparo.',
            'MOUTHBROODER': 'Carrega os ovos na boca.',

            // Forma de nado:
            'TOP': 'Peixe que nada na superfície do Aquário.',
            'MIDDLE': 'Peixe que nada em altura média do Aquário.',
            'BOTTOM': 'Peixe que nada no fundo do Aquário.',
            'ANY': 'Peixe que nada em qualquer Parte do Aquário.',

            // Iluminação:
            'DARK': 'O mais escuro possivel, o mínimo para que o peixe fique visivel.',
            'MEDIUM': 'Bem iluminado sem luz natural.',
            'BRIGHT': 'Bem iluminado e com luz do natural ocasionalmente.',

            // OUTROS
            'PH': 'Relativo a acidez/Alcalinidade da água. Acima de 7.0 é alcalino abaixo é ácido.',
            'DH': 'Dureza da água de acordo com a escala Alemã. Quanto menor o valor, mais mole a água será.',
            'TEMPERATURA': 'Temperatura em grau centígrado.',
            'TAMANHO': 'Valor máximo em tamanho que o peixe atinge em centímetro',
            'CAPACIDADE': 'Capacitade em litros que o menor aquário deve ter para possuir tal espécie.'
        });

})();