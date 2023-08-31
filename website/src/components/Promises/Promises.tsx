import React, { useMemo } from 'react';
import { toast } from 'sonner';
import { CodeBlock } from '../CodeBlock';

const promiseCode = '`${data.name} toast has been added`';

export const Promises = ({ setRichColors }: { setRichColors: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const allPromises = useMemo(
    () => [
      // REVIEW: Move default Promise demo from Types to here?
      {
        name: 'Success Action',
        snippet: `const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  
  toast.promise<{ name: string }>(promise, {
    loading: 'Loading...',
    success: {
      resolve: () => {
        return ${promiseCode};
      },
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    },
    error: 'Error',
  });`,
        action: () =>
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve({ name: 'Sonner' });
                }, 2000);
              }),
            {
              loading: 'Loading...',
              success: {
                resolve: (data) => {
                  setRichColors(true);
                  return `${data.name} toast has been added`;
                },
                action: {
                  label: 'Undo',
                  onClick: () => console.log('Undo'),
                },
              },
              error: 'Error',
            },
          ),
      },
      {
        name: 'Error Action',
        snippet: `const promise = () => new Promise((_, reject) => setTimeout(reject, 2000));
  
  toast.promise<{ name: string }>(promise, {
    loading: 'Loading...',
    success: 'Success!',
    error: {
      resolve: (error) => {
        return error;
      },
      action: {
        label: 'View',
        onClick: () => console.log('View'),
      },
  });`,
        action: () =>
          toast.promise<{ name: string }>(
            () =>
              new Promise((_, reject) => {
                setTimeout(() => {
                  reject('Ugh oh! An Error occured!');
                }, 2000);
              }),
            {
              loading: 'Loading...',
              success: 'Success!',
              error: {
                resolve: (error) => {
                  setRichColors(true);
                  return error;
                },
                action: {
                  label: 'View',
                  onClick: () => console.log('View'),
                },
              },
            },
          ),
      },
    ],
    [setRichColors],
  );

  const [activeType, setActiveType] = React.useState(allPromises[0]);

  return (
    <div>
      <h2>Promises</h2>
      <p>
        You can set a separate action for the success and error of a promise.
        <br />
        <strong>This overrides the action type.</strong>
      </p>
      <div className="buttons">
        {allPromises.map((type) => (
          <button
            className="button"
            data-active={activeType.name === type.name}
            onClick={() => {
              type.action();
              setActiveType(type);
            }}
            key={type.name}
          >
            {type.name}
          </button>
        ))}
      </div>
      <CodeBlock>{`${activeType.snippet}`}</CodeBlock>
    </div>
  );
};
