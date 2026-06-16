
import SpinnerBig from './(client)/components/SpinnerBig'

const loading = () => {
  return (
    <div className="fixed inset-0 bg-gray/10 backdrop-blur-xs flex items-center justify-center">
      <SpinnerBig />
    </div>

  )
}

export default loading
