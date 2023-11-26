import Card from './Card'
import CardSkeleton from './CardSkeleton'

function ListCards({ data = [], loading, update = false }) {
  return (
    <div className=''>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            {!loading ? (
              <Card
                update={update}
                liked_by_user={1}
                {...item}
              />
            ) : (
              <CardSkeleton />
            )}
          </div>
        ))
      ) : (
        <div className='text-center pt-32'>No hay Eventos</div>
      )}
    </div>
  )
}

export default ListCards
