// import { screen, fireEvent, render } from '@testing-library/dom';
// import '@testing-library/jest-dom';
// import getInfo from './form.js';

// describe('Plant Recommendation Form', () => {
//   it('displays the correct recommendation after submitting the form', () => {
//     const placement = 'low';
//     const sunlight = 'no';
//     const pets = 'notoxic';
//     const watering = 'underwater';
//     const style = 'minimalism';
//     const extras = ['pebbles'];

//     render(getInfo(placement, sunlight, pets, watering, style, extras));

//     fireEvent.click(screen.getByLabelText('Inside with some indirect light'));
//     fireEvent.click(screen.getByLabelText('No'));
//     fireEvent.click(screen.getByLabelText('Yes'));
//     fireEvent.click(screen.getByLabelText('Underwater'));
//     fireEvent.click(screen.getByLabelText('I like minimalism and material colors'));
//     fireEvent.click(screen.getByLabelText('Pebbles'));
//     fireEvent.click(screen.getByText('Get your plant!'));

//     expect(screen.getByText('Sansevieria')).toBeInTheDocument();
//     expect(screen.getByText('Composted soil')).toBeInTheDocument();
//     expect(screen.getByText('Clay pot')).toBeInTheDocument();
//     expect(screen.getByText('Unpainted')).toBeInTheDocument();
//     expect(screen.getByText('Pebbles')).toBeInTheDocument();
//   });
// });

import getInfo from './form.js';

test('displays the correct recommendation after submitting the form', () => {
  const data = getInfo('low', 'no', 'notoxic', 'underwater', 'minimalism', ['pebbles']);

  expect(data.plant).toBe('Boston Fern');
  expect(data.soil).toBe('Fertilized soil');
  expect(data.material).toBe('Ceramic');
  expect(data.color).toBe('Unpainted');
  expect(data.extras).toEqual(['pebbles']);
});

