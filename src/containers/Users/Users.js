import React, { useState, Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import './Users.css';


function RenderUser({ user }) {
  return (
    <ListGroupItem className="justify-content-between">
      <Row>
        <ListGroupItemHeading className="col-12 col-sm-6">{user.name} <Badge pill>{user.country_code}</Badge></ListGroupItemHeading>
        <ListGroupItemText className="col-12 col-sm-6 order-sm-last">{user.email}</ListGroupItemText>
      </Row>
    </ListGroupItem>
  );
}

function TabComp(props) {
  let [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if (activeTab !== tab) setActiveTab(tab);
    }

    let authors = props.data.map((user) => {
      if(user.type === 'Author'){
        return (
          <RenderUser key={user.id} user={user} />
        );
      } else return null;
    });

    let reviewers = props.data.map((user) => {
      if(user.type === 'Reviewer'){
        return (
          <RenderUser key={user.id} user={user} />
        );
      } else return null;
    });

    return (
      <div className="users">
        <div className="row row-content justify-content-center text-center">
          <div className="col-12 col-sm-8">
            <h className="usertitle">Regitered Users</h>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                    Authors
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                    Reviewers
                  </NavLink>
                </NavItem>
              </Nav>


              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col>
                      <ListGroup>
                        {authors}
                      </ListGroup>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="2">
                  <Row>
                    <Col>
                      <ListGroup>
                        {reviewers}
                      </ListGroup>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    );
}


class Users extends Component {

  state = {
    Data: [
      { id: 0, name: "Mohammed Aslam", email: "aslam@gmail.com", country_code: "SL", type:"Author" },
      { id: 1, name: "Mohammed Aslam", email: "aslam@gmail.com", country_code: "PK", type:"Author"  },
      { id: 2, name: "Mohammed Aslam", email: "aslam@gmail.com", country_code: "IN", type:"Author"  },
      { id: 0, name: "Mohammed Aslam", email: "aslam@gmail.com", country_code: "SL", type:"Author"  },
      { id: 1, name: "Mohammed Aslam", email: "aslam@gmail.com", country_code: "PK", type:"Reviewer"  },
      { id: 2, name: "Mohammed Aslam", email: "aslam@gmail.com", country_code: "IN", type:"Reviewer"  }
    ]
  }

  componentDidMount() {
    const tokenData = {
      token: this.props.token
    };

    axios.get('test/users', tokenData)
      .then(response => {

        const fetchedPosts = [];
        for (let key in response.data.result) {
          fetchedPosts.push({
            ...response.data.result[key],
            id: key
          });
        }

        this.setState({ Data: fetchedPosts });

        console.log("from local state" + this.state.Data);
      });
  }

  render() {
    return <TabComp data={this.state.Data}/> 
  }
}

export default Users;