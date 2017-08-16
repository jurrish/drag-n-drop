import React from 'react';
//binds our store to our components from react-redux - this allows us to grab parts of state and pass it to our components through dispatch.
import { connect } from 'react-redux';
import {
  categoryCreate as categoryActionCreate
} from '../../action/category-actions.js';

//output from our action creator named categoryCreate:
  //  {
//   type: 'CATEGORY_CREATE',
//   payload: ({
//     title: 'cool',
//     id: uuid()
//     timestamp: new Date(),
//   })
// }


import CategoryItem from '../category-item/index.js'
import CategoryForm from '../category-form/index.js';

class DashboardContainer extends React.Component {

  componentDidMount () {
      // this.props.categoryCreate({ title: 'cool beans' }),
      // this.props.categoryCreate({ title: 'brap' }),
      // this.props.categoryCreate({ title: 'blap' }),
  }

  render() {
    console.log('categories', this.props.categories)
    return (
      <main className='dashboard-container'>
        <h2> dashboard </h2>
        <CategoryForm
          buttonText='create category'
          onComplete={ this.props.categoryCreate } />
        { this.props.categories.map((item) =>

          <CategoryItem key={item.id} category={ item } />
        )}
      </main>
    )
  }
}

//maps state to props of wherever we nest the props
const mapStateToProps = (state) => {
  //whatever we map here gets returned as props
  return {
    categories: state.categorys,
  }
}

//when our actions are dispatched, they are passed into the reducer. and that changes the state of the application
//dispatch allows us to pass an action into a reducer.
//getState gets the state from the store
//react redux takes state and map it to props
//mapDispatchToProps gives us access to dispatch and then we can create methods to be this.props.methodName (categoryCreate, categoryUpdate, categoryDelete). these are seen in our this.props.categoryCreate in our componentDidMount
const mapDispatchToProps = (dispatch, getState) => {
  return {
    categoryCreate: (category) => dispatch(categoryActionCreate(category)),
    categoryUpdate: (category) => dispatch(categoryActionUpdate(category)),
    categoryDelete: (category) => dispatch(categoryActionDelete(category)),
  }
}

//we use connect method to allow DashboardContainer to consume mapStateToProps and mapDispatchToProps
//connect takes in a Component and binds default props to it
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

// NOTE: can be written like this:
// --------------------------
// let bindToStore = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )
//
// DashboardContainer = bindToStore(DashboardContainer)
//
// export default DashboardContainer;
//------------------------------


//this is kinda like redux
// let bindPropsToComponent = (props, Component) => return new Component(props);
// let ExampleDashboard = bindPropsToComponent( { someDefaultProperty: 'SomeDefaultValue' }, DashboardContainer);
