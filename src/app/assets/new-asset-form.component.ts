import { Asset } from '@/models/asset';
import { AssetTypes } from '../constants/assetTypes';
import { Component, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material';
import { AssetService } from '../services/asset.service';
import { Router } from '@angular/router';
import { LogService } from '@/shared/log.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Form, NgForm } from '@angular/forms';

@Component({
    selector: 'new-asset-form',
    styleUrls: ['new-asset-form.component.css'],
    templateUrl: 'new-asset-form.component.html',
})

export class NewAssetForm {
    asset: Asset = <Asset>{};
    assetTypes = AssetTypes;
    @ViewChild(MatSelect, { static: false }) assetType: MatSelect;

    constructor(private assetService: AssetService,
        private logger: LogService,
        private router: Router,
        private snackBar: MatSnackBar) { }

    //Create new asset
    createAsset(assetForm: NgForm) {
        if(assetForm.valid){
            this.logger.log("Creating new asset with Asset Type: " + this.asset.assetType +
                ", Description: " + this.asset.description +
                ", and Assigned To: " + this.asset.assignedTo);

            this.assetService.createAsset(this.asset)
                .subscribe(() => {

                    const snackBarRef = this.snackBar.open('Asset successfully created.', 'Dismiss', {
                        duration: 5000
                    });

                    snackBarRef.afterOpened().subscribe(() => {
                        this.router.navigate(['/']);
                    });

                },
                    error => {
                        this.logger.log("Error creating new asset: " + error);
                        this.snackBar.open('Error creating new asset, please try again.', 'Dismiss', {
                            duration: 5000
                        });
                    });
        } else {
            this.snackBar.open('Oops! Please check for validation errors and try again.', 'Dismiss', {
                duration: 5000
            });
        }
    }
}