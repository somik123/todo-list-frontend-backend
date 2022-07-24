import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

jest.setTimeout(60000);
self.IS_REACT_ACT_ENVIRONMENT = true;




const min = 1000000;
const max = 10000000;
const rand = Math.round( min + Math.random() * (max - min) );
const task = ["New test task " + rand, "This is the test task " + rand + " that was added.", "2022-07-10"];



test('checks title is rendered', async () => {
  render(<App />);
  const txtTitle = await screen.findByText(/Simple Todo List/i);
  expect(txtTitle).toBeInTheDocument();
});



test('Checks add button is rendered', async () => {
  render(<App />);
  const newButton = await screen.findByRole("button", {name: /New Todo/i} );
  expect(newButton).toBeInTheDocument();
});



test('Checks add task is displayed on button click', async () => {
  await act(async () => {
    render(<App />);
  });

  const newButton = await screen.findByRole("button", {name: /New Todo/i} );
  fireEvent.click(newButton);

  const addTaskTitle = await screen.findByPlaceholderText(/Title for the new task/i);
  const addTaskDesc = await screen.findByPlaceholderText(/Detailed description of the task/i);
  const addTaskDate = await screen.findByTestId(/TodoDate/i);
  const saveTaskButton = await screen.findByRole("button", {name: /Save/i} );

  expect(addTaskTitle).toBeInTheDocument();
  expect(addTaskDesc).toBeInTheDocument();
  expect(addTaskDate).toBeInTheDocument();
  expect(saveTaskButton).toBeInTheDocument();
});



test('Save a new task', async () => {
  render(<App />);
  const regex2 = new RegExp(task[0],"i");

  const newButton = await screen.findByRole("button", {name: /New Todo/i} );
  fireEvent.click(newButton);

  const addTaskTitle = await screen.findByPlaceholderText(/Title for the new task/i);
  const addTaskDesc = await screen.findByPlaceholderText(/Detailed description of the task/i);
  const addTaskDate = await screen.findByTestId(/TodoDate/i);
  const saveTaskButton = await screen.findByRole("button", {name: /Save/i} );

  // Enter task title, description and date
  fireEvent.change(addTaskTitle, { target: { value: task[0] } });
  fireEvent.change(addTaskDesc, { target: { value: task[1] } });
  fireEvent.change(addTaskDate, { target: { value: task[2] } });

  // Save for next validation
  fireEvent.click(saveTaskButton);
  await new Promise((r) => setTimeout(r, 2000));
});


test('Ensure task was added successfully', async () => {
  render(<App />);
  const regex1 = new RegExp(task[0],"i");
  const regex2 = new RegExp(task[1],"i");
  const txtTitle = await screen.findByText(regex1);
  const txtDescription = await screen.findByText(regex2);

  expect(txtTitle).toBeInTheDocument();
  expect(txtDescription).toBeInTheDocument();
})



test('Tick the checkbox button for the task that was added', async () =>{
  render(<App />);

  const btnRegex = new RegExp("Btn_"+task[0],"i");
  const imgRegex = new RegExp("Img_"+task[0],"i");

  const checkCompleteButton = await screen.findByTestId(btnRegex);
  expect(checkCompleteButton).toBeInTheDocument();

  const checkCompleteButtonImg = await screen.findByTestId(imgRegex);
  expect(checkCompleteButtonImg).toBeInTheDocument();
  expect(checkCompleteButtonImg.src).toBe("http://localhost/images/checkbox-empty-sm.png");

  // Check tickbox for next validation
  fireEvent.click(checkCompleteButton);
  await new Promise((r) => setTimeout(r, 2000));
});



test('Confirm it shows as checked', async () =>{
  render(<App />);

  const btnRegex = new RegExp("Btn_"+task[0],"i");
  const imgRegex = new RegExp("Img_"+task[0],"i");

  const checkCompleteButton = await screen.findByTestId(btnRegex);
  expect(checkCompleteButton).toBeInTheDocument();

  const checkCompleteButtonImgAlt = await screen.findByTestId(imgRegex);
  expect(checkCompleteButtonImgAlt).toBeInTheDocument();
  expect(checkCompleteButtonImgAlt.src).toBe("http://localhost/images/checkbox-tick-sm.png");

  // Uncheck tickbox for next validation
  fireEvent.click(checkCompleteButton);
  await new Promise((r) => setTimeout(r, 2000));
});



test('Confirm it shows as unchecked', async () =>{
  render(<App />);

  const btnRegex = new RegExp("Btn_"+task[0],"i");
  const imgRegex = new RegExp("Img_"+task[0],"i");

  const checkCompleteButtonImg = await screen.findByTestId(imgRegex);
  expect(checkCompleteButtonImg).toBeInTheDocument();
  expect(checkCompleteButtonImg.src).toBe("http://localhost/images/checkbox-empty-sm.png");

  // Check tickbox for next validation
  await new Promise((r) => setTimeout(r, 2000));
});


