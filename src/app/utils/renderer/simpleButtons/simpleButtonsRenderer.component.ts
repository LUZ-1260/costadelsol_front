import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-simple-buttons-renderer',
    templateUrl: './simpleButtonsRenderer.component.html',
    styleUrl: './simpleButtonsRenderer.component.scss'
})
export class SimpleButtonsRendererComponent implements ICellRendererAngularComp {

    params: ICellRendererParams;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    onActionClicked(action: string): void {
        const rowId = this.params.data.id;
        const data = this.params.data;
        this.params.context.componentParent.onActionClickAgGrid({ action, rowId, data });
    }

    refresh(params: ICellRendererParams) {
        return true;
    }
}
