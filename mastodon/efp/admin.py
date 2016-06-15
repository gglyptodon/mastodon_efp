from django.contrib import admin
from .models import Gene, GeneSet, TPM_csv, FDR_csv
# Register your models here.

class GeneAdmin(admin.ModelAdmin):
    pass


class TPM_CSVAdmin(admin.ModelAdmin):
    pass

class FDR_CSVAdmin(admin.ModelAdmin):
    pass

class GeneSetAdmin(admin.ModelAdmin):
    pass


admin.site.register(Gene, GeneAdmin)
admin.site.register(GeneSet, GeneSetAdmin)
admin.site.register(TPM_csv, TPM_CSVAdmin)
admin.site.register(FDR_csv, FDR_CSVAdmin)