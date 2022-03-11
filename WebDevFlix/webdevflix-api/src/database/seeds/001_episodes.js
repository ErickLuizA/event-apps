
export function seed (knex) {
  // Deletes ALL existing entries
  return knex('episodes').del()
    .then(function () {
      return knex('episodes').insert([
        {
          title: 'Autenticação no React Native / ReactJS com Context API & Hooks | Masterclass #12',
          link: 'https://www.youtube.com/watch?v=KISMYYXSIX8&list=PL85ITvJ7FLoiNndfuEs2So-MFLSMvBmmD&index=4&t=0s',
          category: 'frontend',
          description: 'Autenticação sempre foi uma pedra no sapato na hora de controlar isso no front-end, seja na web ou no mobile, mas com a Context API e os hooks, isso se torna um processo muito mais simples.'
        },
        {
          title: 'TypeScript, o início, de forma prática | MasterClass #07',
          link: 'https://www.youtube.com/channel/https://www.youtube.com/watch?v=0mYq5LrQN1s&list=PL85ITvJ7FLoiNndfuEs2So-MFLSMvBmmD&index=6&t=648s',
          category: 'backend',
          description: 'Nesse vídeo eu quero desmistificar algumas opiniões sobre o TypeScript e mostrar como essa linguagem de programação tem ganhado tanto espaço no coração dos devs e também no mercado.'
        },
        {
          title: 'React Hooks com TypeScript | Masterclass #04',
          link: 'https://www.youtube.com/watch?v=GOB-lawExXc&list=PL85ITvJ7FLoiNndfuEs2So-MFLSMvBmmD&index=9&t=0s',
          category: 'frontend',
          description: 'Nesse vídeo vamos conhecer a aplicação de TypeScript em cada um dos hooks do React, useState, useMemo, useCallback, useRef, useContext, useReducer e useImperativeHandle.'
        }
      ])
    })
}
