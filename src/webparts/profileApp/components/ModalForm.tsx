import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactHtmlParser from 'react-html-parser';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import {IListItem} from './IListItem';
import {IAllItemsState} from './IAllItemsState';


export interface IModalFormProps {
  show: boolean;
    onHide: boolean;
  modalBody: string;
  modalId: number;
  heading: string;
}

export interface IModalFormState {
  
}

export default class ModalForm extends React.Component<IModalFormProps, IAllItemsState> {
  

 
  
  constructor(props: IModalFormProps){
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state ={
      items: [    
        {    
          "Title": "",    
          "EmployeeId": "",    
          "Experience":"",   
          "Location":"",
          "PhoneNumber": "",
          "Email": "",
          "Address": "",
          "Summary": "",
          "Modified": "",
          "EducationItem":[],
          "ExperienceItem":[],
          "ProfileImage": "",
          "SkillsItem": [],
          "ProjectItem": [],
          "SocialIconItem":[]
        }    
      ],
     /*  isOpen: false,
      modalIsOpen: false,
      modalShow: false,
      modalBody: "", */
      /* modalId: null */
      show: false,
      onHide: false,
      modalBody: "",
      modalId: null,
      heading: "" 
    }
  }

  public render(): React.ReactElement<IModalFormProps> {
    
   
    
    return(
      <div>
       
      <Modal show={this.props.show} onHide={ this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ReactHtmlParser(this.props.modalBody)}</Modal.Body>
        <Modal.Footer>
          
          
        </Modal.Footer>
      </Modal>
      </div>
    );

  }

  public handleClose(this) {

    this.props.show = false;
    this.setState({show: false, onHide: false});
  }


  public handleShow(html, index, headingTitle) {
    this.setState({show: true, onHide: true, modalBody: html, modalId: index, heading: headingTitle});
  }
  
}