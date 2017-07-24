import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import autobind from 'autobind-decorator'

@withGraphQL(gql`query getAcceptedRecipes{
  getAcceptedRecipes{
    _id
    title
  }
}`)

@withMessage
@withMutation(gql`mutation deleteRecipe($_id: ID!){
  deleteRecipe(_id: $_id)
}`)

export default class All extends React.Component {

  static propTypes = {
    getAcceptedRecipes: React.PropTypes.func,
    deleteRecipe: React.PropTypes.func
  }

  @autobind
  async renderDelete (variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.deleteRecipe({_id: variable})
      window.location.href = '../recipes/all'
      window.alert('Recipe deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  renderRecipes () {
    const {getAcceptedRecipes} = this.props
    return getAcceptedRecipes.map(recipe => {
      return (
        <div key={recipe._id} className='row'>
          <div className ='col-xs-12 col-sm-12'>
            {recipe.title}
            <Button label='Delete' onClick={() => this.renderDelete(recipe._id)}/>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        {this.renderRecipes()}
      </div>
    )
  }

}