import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ProfileAppWebPartStrings';
import ProfileApp from './components/ProfileApp';
import { IProfileAppProps } from './components/IProfileAppProps';
import { string } from 'prop-types';

export interface IProfileAppWebPartProps {
  //added for 
  listName: string;
  description: string;
}

export default class ProfileAppWebPart extends BaseClientSideWebPart<IProfileAppWebPartProps> {

  public render(): void {
    
    const element: React.ReactElement<IProfileAppProps > = React.createElement(
      ProfileApp,
      {
        //added
        description: this.properties.description,    
        siteurl: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName',{
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('description',{
                  label: strings.DescriptionFieldLabel
                })
                

              ]
            }
          ]
        }
      ]
    };
  }
}
