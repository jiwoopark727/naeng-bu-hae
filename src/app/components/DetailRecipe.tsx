import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import fallback from '../../.././public/fallback.png';
import { StepItems } from '../(recipes)/recipes/detail/[name]/page';

type Props = {
  step: StepItems[];
};

const rowVariants = {
  entry: (back: boolean) => ({
    x: back ? -400 : 400,
  }),
  center: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? 400 : -400,
  }),
};

export default function DetailRecipe({ step }: Props) {
  const offset = 1;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);

  const increaseIndex = () => {
    if (step) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const totalSteps = step.length - 1;
      const maxIndex = Math.floor(totalSteps / offset);
      setLeaving(true);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (step) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalSteps = step.length - 1;
      const maxIndex = Math.floor(totalSteps / offset);
      setLeaving(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  {
    /* 레시피(스크롤 영역) */
  }
  return (
    <section className='flex flex-col flex-grow border border-gray-300 rounded-xl p-3 text-xs'>
      <div className='border-b-2 border-gray-200 pb-1 mb-2 font-bold'>레시피</div>

      <div className='flex justify-between items-center mb-3'>
        <button
          type='button'
          className='cursor-pointer text-gray-600 hover:text-gray-900'
          aria-label='이전 단계'
          onClick={decreaseIndex}
        >
          <FontAwesomeIcon icon={faAngleLeft} className='w-5 h-5' />
        </button>

        <span className='text-sky-400 font-bold text-sm'>Step.{index + 1}</span>

        <button
          type='button'
          className='cursor-pointer text-gray-600 hover:text-gray-900'
          aria-label='다음 단계'
          onClick={increaseIndex}
        >
          <FontAwesomeIcon icon={faAngleRight} className='w-5 h-5' />
        </button>
      </div>

      <div className='relative h-[250px] overflow-hidden'>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={back}>
          <motion.div
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) {
                increaseIndex(); // 오른쪽으로 넘김
              } else if (info.offset.x > 100) {
                decreaseIndex(); // 왼쪽으로 넘김
              }
            }}
            custom={back}
            variants={rowVariants}
            initial='entry'
            animate='center'
            exit='exit'
            transition={{ type: 'tween', duration: 1 }}
            key={index}
            className='absolute w-full h-full mb-4'
          >
            {step
              .slice(0)
              .slice(offset * index, offset * index + offset)
              .map((i) => (
                <div key={i.image} className='flex flex-col items-center'>
                  <Image
                    src={i.image || fallback}
                    alt='step'
                    width={265}
                    height={170}
                    className='rounded-xl object-cover mb-2'
                  />

                  <div className='px-2'>
                    <p>{i.description}</p>
                  </div>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
