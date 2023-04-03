import React from 'react'
import { useGlobalContext } from '../Context/context'
import { Link } from 'react-router-dom'
import { Tooltip, Fade, Skeleton } from '@mui/material'
const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movies = () => {
  const { movies, isLoading } = useGlobalContext()
  const titleMaker = (title) => {
    return title.split(' ').join('-')
  }
  if (isLoading) {
    return (
      <section className='movies'>
        {skeleton.map((index) => {
          return (
            <Skeleton
              animation='wave'
              key={index}
              variant='rounded'
              width={`100%`}
              height={`400px`}
            />
          )
        })}
      </section>
    )
  }

  return (
    <section className='movies'>
      {movies.map((movie) => {
        const {
          imdbID: id,
          Poster: poster,
          Title: title,
          Year: year,
          Type,
        } = movie
        return (
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            arrow
            title={`${Type} : ${title} - ${year} `}
            key={id}>
            <Link to={`/${titleMaker(title)}/${id}`} className='movie'>
              <article>
                <img src={poster === 'N/A' ? url : poster} alt={title} />
                <div className='movie-info'>
                  <h4 className='title'>{title}</h4>
                  <p>{year}</p>
                </div>
              </article>
            </Link>
          </Tooltip>
        )
      })}
    </section>
  )
}

export default Movies
