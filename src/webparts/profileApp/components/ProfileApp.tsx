import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ProfileApp.module.scss';
import * as jquery from 'jquery';

import { IProfileAppProps } from './IProfileAppProps';
import { IAllItemsState } from './IAllItemsState';
import { IListItem } from './IListItem';

import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration, ISPHttpClientOptions } from '@microsoft/sp-http';

import '../css/style.css';

import * as moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import {SocialIcon} from 'react-social-icons';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
//import Modal from 'react-modal';
import Modal from 'react-bootstrap/Modal'

import ModalForm from './ModalForm';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class ProfileApp extends React.Component<IProfileAppProps, IAllItemsState> {
  /* added */
  constructor(props: IProfileAppProps, state: IAllItemsState){
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    
    this.state = {
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
      /* isOpen:false,
      modalIsOpen: false,
      modalShow: false,
      modalBody: "",
      modalId: null */
      show: false,
      onHide: false,
      modalBody: "",
      modalId: null,
      heading: "" 
    };
  }

  public render(): React.ReactElement<IProfileAppProps> {
    moment.locale('en');
    /* added */
    
    
   
    return (
      
      
      <div>  
        <ModalForm 
            show={this.state.show}
            onHide={this.state.onHide}
            modalBody = {this.state.modalBody}
            modalId = {this.state.modalId}
            heading = {this.state.heading}
        />  
     
        {this.state.items.map(function(item,key){ 
           
            
          return (<div key={key}>  
            <div className="columns-block container">
              {/* Left Area */}
              <div className="left-col-block blocks">
                <header className="header theiaStickySidebar">
                  <div className="profile-img">
                      <img src={item.ProfileImage} className="img-responsive img-fluid" alt=""/>
                  </div>
                  <div className="content">
                      <h1>{item.Title}</h1>
                      <span className="lead">{item.Title}</span>

                      <div className="about-text">
                          <p>
                              {item.Summary}
                          </p>

                      </div>

                      <ul className="social-icon padding-right">
                        {item.SocialIconItem.map(function(icon,key){
                          

                          return(
                              <li key={key}><SocialIcon url={icon.SocialUrl.Url} network={icon.Title}/></li>
                            
                          );
                          
                        })}
                      </ul>
                  </div>

                    {/* Skills */}
                    <section className="skills-wrapper">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="paddingBottom">Skills <Button className="editButton" variant="light" size="sm" onClick={event =>  window.open('https://yhsto.sharepoint.com/sites/YHSCompany/Lists/Skills/AllItems.aspx')}>Edit</Button></h2>
                                
                            </div>
                        </div>

                      </div>
                      
                      <div className="row">
                        <div className="col-md-12">
                          <div className="progress-wrapper">
                            {item.SkillsItem.map(function(skill,key){
                              return(<div key={key}> 
                                <div className="progress-item">
                                  <span className="languages progress-title">{skill.Title}</span>

                                  <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow={skill.Progress * 100} aria-valuemin={0}
                                        aria-valuemax={100} style={{width: skill.Progress * 100 + "%"}}><span className="progress-percent"> {skill.Progress * 100 + "%"}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                </header>

              </div>
              
              {/* Right Area */}
              <div className="right-col-block blocks">
                <div className="theiaStickySidebar">

                  {/* Experiences */}
                  <section className="section-wrapper section-experience gray-bg">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="section-title"><h2>Work Experience <Button className="editButton" variant="light" size="sm" onClick={event =>  window.open('https://yhsto.sharepoint.com/sites/YHSCompany/Lists/Experience/AllItems.aspx')}>Edit</Button></h2></div>

                          <div className="row">
                            <div className="col-md-12">
                              <div className="content-item">
                                
                               
                                {item.ExperienceItem.map((company,companyKey)=>{
                                  var ExperienceModalBody = "<div><iframe src='https://en.m.wikipedia.org/wiki/Canadian_Imperial_Bank_of_Commerce' class='fullheight'/></div>";

                                  return(<div key={key}> 
                                      <small> {moment(company.StartDate).format('YYYY MM')} - {moment(company.EndDate).format('YYYY MM')}</small>

                                      <h3>{company.Title }</h3>
                                      
                                      <h4 className="company">
                                        
                                      <a onClick={e => this.handleShow(e,ExperienceModalBody,companyKey,company.Company)}>{company.Company}</a></h4>
                      
                                      <div className="project-details">
                                        <p className="toggleButton" id={"dutyToggler" + key}>
                                          Duties...
                                        </p>

                  
                                        <UncontrolledCollapse toggler={"#dutyToggler" + key}>
                                          <Card>
                                            <CardBody>
                                              {ReactHtmlParser (company.Description)}
                                            </CardBody>
                                          </Card>
                                        </UncontrolledCollapse>
                                      </div>

                                     {/*  <p>{ReactHtmlParser (company.Description)}</p> */}
                                    </div>
                                  );
                                  },this)} 
        
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Projects */}
                  <section className="section-wrapper portfolio-section">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="section-title">
                              <h2 className="paddingBottom">Projects <Button className="editButton" variant="light" size="sm" onClick={event =>  window.open('https://yhsto.sharepoint.com/sites/YHSCompany/Lists/Projects/AllItems.aspx')}>Edit</Button></h2>
                              
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {item.ProjectItem.map((project,projectKey)=>{
                        
 
                          const isOpen = false;
                          const toggle = () => !isOpen;
                          
                         
                          var ProjectModalBody = "<div>" + 
                                                    "<div id='projectModal" + ReactHtmlParser(projectKey) + "' class='portfolio-thumb'>" + 
                                                      "<img src='" + project.ProjectScreenShot + "' alt=''></img>" + 
                                                    "</div>" + 
                                                    "<p class='project-Description'>" + project.Description+ "</p>" + 
                                                    "<a href='" + project.ProjectUrl + "'>Project Link</a></br>" + 
                                                    "<small><a href='" + project.DesignDocumentUrl + "'>Design Document</a></small>" + 
                                                    "<br></br><small>Languages used: </small> <small class='languages'>" + ReactHtmlParser(project.Languages) +"</small>" + 
                                                  "</div>";

                          return(
                          <div className="col-md-6">
                          
                            <div key={key}> 
                              <div className ="portfolio">
                                

                                <div className="portfolio-info">
                                  
                                  <a className="portfolio-item" href={project.ProjectUrl}><h3>{project.Title}</h3></a>
                                  <div className="project-details">
                                    <p id={"toggler" + key}>
                                      <div className="toggleButton" onClick={e => this.handleShow(e, ProjectModalBody, projectKey, project.Title)}>Details...</div>
                                      
                                    </p>

                                   

                                    {/* <UncontrolledCollapse toggler={"#toggler" + key}>
                                      <Card>
                                        <CardBody>
                                          <p className="project-Description">{ReactHtmlParser (project.Description)}</p>
                                            <small>Languages used: </small> <small className="languages">{project.Languages}</small>
                                        </CardBody>
                                      </Card>
                                    </UncontrolledCollapse> */}
                                  </div>
                                  <div className="projectFooter">
                                    <small><a href={project.DesignDocumentUrl}>Design Document</a></small><br></br>
                                    <small>Developed for </small><small className="company">{project.Company}</small>
                                  </div>
                                </div>
                               </div>                  
                            
                            </div>
                          
                          </div>
                          );
                        },this)} 
                              
                      </div>
                    </div>
                  </section>

                  {/* Education */}              
                  <section className="section-wrapper section-education">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                            <div className="section-title"><h2>Education <Button className="editButton" variant="light" size="sm" onClick={event =>  window.open('https://yhsto.sharepoint.com/sites/YHSCompany/Lists/Education/AllItems.aspx')}>Edit</Button></h2></div>
                        </div>             
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="content-item">
                            {item.EducationItem.map(function(school,key){
                              return(<div key={key}> 
                                  <small>{moment(school.StartYear).format('YYYY MM')} - {moment(school.EndYear).format('YYYY MM')}</small>
                                  <h3>{ school.Degree }</h3>
                                  <h4 className="company">{ school.Title }</h4>
                                  <p>{ school.Field }</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                  </section>

                  {/* Contacts */}         
                  <section className="section-contact section-wrapper gray-bg">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2>Contact</h2>
                            </div>
                        </div>
                      </div>
                            
                      <div className="row">
                          <div className="col-md-12">
                            <address>
                              <strong>Address </strong>
                              {item.Address}
                            </address>
                            <address>
                              <strong>Phone Number </strong>
                              {item.PhoneNumber}
                            </address>
                            <address>
                              <strong>Email </strong>
                              <a href="mailto:#">{item.Email}</a>
                            </address>
                                 
                          </div>
                      </div>
                      
                      <div className="row">
                          <div className="col-md-12">
                              <div className="feedback-form">
                                  <h2>Get in touch</h2>

                                  <form id="contactForm" action="sendemail.php" method="POST">
                                      <div className="form-group">
                                          <label>Name</label>
                                          <input type="text" name="name" className="form-control" id="InputName"
                                                  placeholder="Full Name"></input>
                                      </div>
                                      <div className="form-group">
                                          <label>Email address</label>
                                          <input type="email" name="email"  className="form-control" id="InputEmail"
                                                  placeholder="Email"></input>
                                      </div>
                                      <div className="form-group">
                                          <label >Subject</label>
                                          <input type="text" name="subject" className="form-control" id="InputSubject"
                                                  placeholder="Subject"></input>
                                      </div>
                                      <div className="form-group">
                                          <label className="control-label">Message</label>
                                          <textarea className="form-control" name="message" id="message-text"
                                                    placeholder="Write message"></textarea>
                                      </div>

                                      <Button type="submit" class="btn btn-primary">Submit</Button>
                                  </form>
                              </div>
                          


                          </div>
                      </div>
                    </div>
                  </section>
                </div>

              </div>
            </div>
          </div>
          );
        }.bind(this))}
                             
      </div>     
    );
  }



  public handleClose() {
    this.setState({onHide: false, show: false});
  }

  public handleShow(e, html, index, headingTitle) {
    this.setState({ show: true, onHide: true, modalBody: html, modalId: index, heading: headingTitle});
  }
 
  public componentDidMount(){    
    var reactHandler = this;  

    var employeeData;
    var educationData;
    var experienceData;
    var pictureData;
    var skillData;
    var projectData;
    var languageData;
    var languages = "";
    var socialIcons;

    
    getListItems("EmployeeList", reactHandler);

    jquery.when(getListItems('EmployeeList', reactHandler), getListItems('Education',reactHandler),getListItems('Experience',reactHandler),getPictureItems('ProfilePictures',reactHandler, "Hyosang Yoo"), getListItems('Skills',reactHandler),getListItems('Projects',reactHandler), getListItems('SocialIcons',reactHandler))
      .then(function(r1, r2, r3, r4, r5, r6, r7) { // Resolve

        var schools = {};
        // list items from EmployeeList
        employeeData = r1[0].d.results;
        // list items from Education List
        educationData = r2[0].d.results;
        // list items from Experience List
        experienceData = r3[0].d.results;

        pictureData = r4[0].d.results;

        skillData = r5[0].d.results;

        projectData = r6[0].d.results;
        languageData =projectData[0].Languages.results;
    
        socialIcons = r7[0].d.results;
        /* get picture url */
        var filename = pictureData[0].FileLeafRef  ;
        var dir =  pictureData[0].FileDirRef  ;
        filename = dir + '/' + filename;

        /* jquery.each(languageData, function( index, value ) {
          languages += value + "; ";
        }); */

        // Add education and experience items arrays to employeeData
        employeeData[0]["EducationItem"] = educationData;
        employeeData[0]["ExperienceItem"] = experienceData;
        employeeData[0]["ProfileImage"] = filename;
        employeeData[0]["SkillsItem"] = skillData;
        employeeData[0]["ProjectItem"] = projectData;
        employeeData[0]["ProjectItem"][0]["ProjectUrl"] = projectData[0].ProjectUrl.Url;
        employeeData[0]["ProjectItem"][0]["DesignDocumentUrl"] = projectData[0].DesignDocument.Url;
        employeeData[0]["ProjectItem"][0]["DesignDocumentDescription"] = projectData[0].DesignDocument.Description;
        employeeData[0]["ProjectItem"][0]["ProjectScreenShot"] = projectData[0].ProjectScreenShot.Url;

        jquery.each(projectData, function( index, value ) {
          languageData = value.Languages.results;
          jquery.each(languageData, function( index, value ) {
            languages += value + "; ";
          });
          employeeData[0]["ProjectItem"][index]["Languages"] = languages;

          languages = "";
        });
        employeeData[0]["SocialIconItem"] = socialIcons;
        
        reactHandler.setState({    
          items: employeeData

        }); 
      }, function(){ // Reject!
      console.log('Something broke!');
    });
      
    function getListItems(listName, reactHandler){
      var listItems;

      var defer = jquery.Deferred();

      return jquery.ajax({    
        url: `${reactHandler.props.siteurl}/_api/web/lists/getbytitle('${listName}')/items`,    
        type: "GET",    
        headers:{'Accept': 'application/json; odata=verbose;'},    
        success: function(resultData) {  
          //listItems = defer.resolve(resultData.d.results);
          listItems = defer.resolve(resultData.d.results);
          /* reactHandler.setState({    
            items: resultData.d.results   
          });  */   
        },    
        error : function(jqXHR, textStatus, errorThrown) {    
        }
       
      });
      
     
    }

    function getPictureItems(listName, reactHandler, employeeName){
      var pictureItems;
      var defer = jquery.Deferred();
      

      return jquery.ajax({    
        url: `${reactHandler.props.siteurl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,FileLeafRef,FileDirRef,Description&$filter=Title eq '${employeeName}'`,    
        type: "GET",    
        headers:{'Accept': 'application/json; odata=verbose;'},    
        success: function(resultData) {  
          //listItems = defer.resolve(resultData.d.results);
          pictureItems = resultData.d.results;
          /* reactHandler.setState({    
            items: resultData.d.results   
          });  */
        
              
        },    
        error : function(jqXHR, textStatus, errorThrown) {    
        }
       
      });
    
    }
       
  } 


  
}
